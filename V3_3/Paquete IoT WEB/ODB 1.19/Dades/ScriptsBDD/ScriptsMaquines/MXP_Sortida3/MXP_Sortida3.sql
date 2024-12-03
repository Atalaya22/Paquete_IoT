GO

/****** Object:  Table [dbo].[MXP_Sortida1]    Script Date: 2/13/2021 9:36:09 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[MXP_Via3_Sortida3](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NULL,
	[Duracio] [time](7) NULL,
	[Final] [datetime] NULL,
	[EstatId] [tinyint] NULL,
	[InfoId] [smallint] NULL,
	[AlarmaId] [smallint] NULL,
	[MosaicId] [smallint] NULL,
	[PaletsTotals] [int] NULL,
 CONSTRAINT [PK_MXP_Via3_Sortida3] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


/****** Object:  Table [dbo].[Temp_MXP_Sortida1]    Script Date: 2/13/2021 9:35:47 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Temp_MXP_Via3_Sortida3](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NULL,
	[EstatId] [tinyint] NULL,
	[InfoId] [smallint] NULL,
	[AlarmaId] [smallint] NULL,
	[MosaicId] [smallint] NULL,
	[PaletsTotals] [int] NULL,
 CONSTRAINT [PK_Temp_MXP_Via3_Sortida3] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[MXP_Sortida1_Cadencies]    Script Date: 2/13/2021 9:26:22 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[MXP_Via3_Sortida3_Cadencies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NOT NULL,
	[Cadencia] [float] NOT NULL,
 CONSTRAINT [PK_MXP_Via3_Sortida3_Cadencies] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
