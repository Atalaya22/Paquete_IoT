/****** Object:  Table [dbo].[MXP_Robot]    Script Date: 2/13/2021 9:36:55 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[MXP_Robot](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NULL,
	[Duracio] [time](7) NULL,
	[Final] [datetime] NULL,
	[EstatId] [tinyint] NULL,
	[InfoId] [smallint] NULL,
	[AlarmaId] [smallint] NULL,
	[ProducteId] [smallint] NULL,
	[AgafadesTotals] [int] NULL,
 CONSTRAINT [PK_MXP_Robot] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Temp_MXP_Robot]    Script Date: 2/13/2021 9:37:02 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Temp_MXP_Robot](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NULL,
	[EstatId] [tinyint] NULL,
	[InfoId] [smallint] NULL,
	[AlarmaId] [smallint] NULL,
	[ProducteId] [smallint] NULL,
	[AgafadesTotals] [int] NULL,
 CONSTRAINT [PK_Temp_MXP_Robot] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


/****** Object:  Table [dbo].[MXP_Robot_Cadencies]    Script Date: 2/13/2021 9:26:22 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[MXP_Robot_Cadencies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NOT NULL,
	[Cadencia] [float] NOT NULL,
 CONSTRAINT [PK_MXP_Robot_Cadencies] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
